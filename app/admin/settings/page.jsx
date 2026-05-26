import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/db";

export const dynamic = "force-dynamic";

const DEFAULT_SETTINGS = {
  siteName: "CineScope",
  siteDescription: "A comprehensive movie management platform.",
  defaultLanguage: "en",
  timezone: "utc",
  themeMode: "system",
  primaryColor: "blue",
  maintenanceMode: false,
  emailNotifications: true,
  reviewModeration: true,
  securityAlerts: true,
  updatedAt: null,
};

function formatDate(value) {
  if (!value) return "Never";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Never";

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

async function saveSettings(formData) {
  "use server";

  const nextSettings = {
    siteName: String(formData.get("siteName") || DEFAULT_SETTINGS.siteName),
    siteDescription: String(
      formData.get("siteDescription") || DEFAULT_SETTINGS.siteDescription,
    ),
    defaultLanguage: String(
      formData.get("defaultLanguage") || DEFAULT_SETTINGS.defaultLanguage,
    ),
    timezone: String(formData.get("timezone") || DEFAULT_SETTINGS.timezone),
    themeMode: String(formData.get("themeMode") || DEFAULT_SETTINGS.themeMode),
    primaryColor: String(
      formData.get("primaryColor") || DEFAULT_SETTINGS.primaryColor,
    ),
    maintenanceMode: formData.get("maintenanceMode") === "on",
    emailNotifications: formData.get("emailNotifications") === "on",
    reviewModeration: formData.get("reviewModeration") === "on",
    securityAlerts: formData.get("securityAlerts") === "on",
    updatedAt: new Date(),
  };

  await db.collection("app_settings").updateOne(
    { _id: "global" },
    {
      $set: nextSettings,
    },
    { upsert: true },
  );

  revalidatePath("/admin/settings");
}

export default async function SettingsPage() {
  const settingsCollection = db.collection("app_settings");
  const moviesCollection = db.collection("movies_n");
  const usersCollection = db.collection("user");
  const reviewsCollection = db.collection("reviews");

  const [
    storedSettings,
    totalMovies,
    totalUsers,
    totalReviews,
    pendingReviews,
  ] = await Promise.all([
    settingsCollection.findOne({ _id: "global" }),
    moviesCollection.countDocuments({}),
    usersCollection.countDocuments({}),
    reviewsCollection.countDocuments({}),
    reviewsCollection.countDocuments({ status: "pending" }),
  ]);

  const settings = storedSettings
    ? { ...DEFAULT_SETTINGS, ...storedSettings }
    : DEFAULT_SETTINGS;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Live application settings stored in MongoDB.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Movies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMovies}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReviews}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Reviews
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReviews}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>
            These values are loaded from and saved back to the database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={saveSettings} className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  name="siteName"
                  defaultValue={settings.siteName}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  name="siteDescription"
                  className="min-h-30"
                  defaultValue={settings.siteDescription}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultLanguage">Default Language</Label>
                <select
                  id="defaultLanguage"
                  name="defaultLanguage"
                  defaultValue={settings.defaultLanguage}
                  className="border-input bg-background focus-visible:ring-ring h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="ja">Japanese</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <select
                  id="timezone"
                  name="timezone"
                  defaultValue={settings.timezone}
                  className="border-input bg-background focus-visible:ring-ring h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2">
                  <option value="utc">UTC</option>
                  <option value="est">Eastern Standard Time (EST)</option>
                  <option value="cst">Central Standard Time (CST)</option>
                  <option value="mst">Mountain Standard Time (MST)</option>
                  <option value="pst">Pacific Standard Time (PST)</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="themeMode">Theme Mode</Label>
                <select
                  id="themeMode"
                  name="themeMode"
                  defaultValue={settings.themeMode}
                  className="border-input bg-background focus-visible:ring-ring h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2">
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <select
                  id="primaryColor"
                  name="primaryColor"
                  defaultValue={settings.primaryColor}
                  className="border-input bg-background focus-visible:ring-ring h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2">
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="red">Red</option>
                  <option value="orange">Orange</option>
                  <option value="teal">Teal</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3 rounded-lg border p-4">
                <input
                  id="maintenanceMode"
                  type="checkbox"
                  name="maintenanceMode"
                  defaultChecked={settings.maintenanceMode}
                  className="mt-1 h-4 w-4"
                />
                <div>
                  <Label htmlFor="maintenanceMode" className="font-medium">
                    Maintenance Mode
                  </Label>
                  <p className="text-muted-foreground text-sm">
                    Restrict access while you make site-wide changes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border p-4">
                <input
                  id="reviewModeration"
                  type="checkbox"
                  name="reviewModeration"
                  defaultChecked={settings.reviewModeration}
                  className="mt-1 h-4 w-4"
                />
                <div>
                  <Label htmlFor="reviewModeration" className="font-medium">
                    Review Moderation
                  </Label>
                  <p className="text-muted-foreground text-sm">
                    Keep new reviews in a pending state until approved.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border p-4">
                <input
                  id="emailNotifications"
                  type="checkbox"
                  name="emailNotifications"
                  defaultChecked={settings.emailNotifications}
                  className="mt-1 h-4 w-4"
                />
                <div>
                  <Label htmlFor="emailNotifications" className="font-medium">
                    Email Notifications
                  </Label>
                  <p className="text-muted-foreground text-sm">
                    Send email alerts for key activity.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-lg border p-4">
                <input
                  id="securityAlerts"
                  type="checkbox"
                  name="securityAlerts"
                  defaultChecked={settings.securityAlerts}
                  className="mt-1 h-4 w-4"
                />
                <div>
                  <Label htmlFor="securityAlerts" className="font-medium">
                    Security Alerts
                  </Label>
                  <p className="text-muted-foreground text-sm">
                    Notify admins about suspicious account changes.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-muted-foreground text-sm">
                Last saved: {formatDate(settings.updatedAt)}
              </p>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
