/**
 * HubSpot configuration
 *
 * To find your subscription type ID:
 *   1. Log into HubSpot → Settings → Marketing → Email → Subscription Types
 *   2. Click on the subscription type used for marketing/product emails
 *   3. The numeric ID is shown in the URL or in the subscription details
 *
 * If you only have one subscription type (common for new accounts),
 * it's typically the first one listed.
 */
export const HS_PORTAL_ID = "51191454";

/** Waitlist "Join waitlist" form */
export const HS_WAITLIST_FORM_GUID = "81067c08-e6eb-43ce-ad3c-2f5e2fca45bd";

/** Contact Sales form */
export const HS_CONTACT_FORM_GUID = "f7684332-cc69-4d56-bd8d-12a2b730bceb";

/**
 * HubSpot communication subscription type ID.
 * Retrieved from the Contact Sales form definition (communicationTypeId).
 */
export const HS_MARKETING_SUBSCRIPTION_TYPE_ID = 2233676378;

/**
 * Read the HubSpot tracking cookie (`hubspotutk`).
 *
 * The HubSpot tracking script (hs-script-loader) sets this cookie
 * when a visitor lands on the site. Including it in the form submission
 * `context.hutk` links the submission to the tracked visitor, which is
 * required for HubSpot to trigger email workflows and sequences.
 */
export function getHubSpotUtk(): string | undefined {
  const match = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("hubspotutk="));
  return match ? match.split("=")[1] : undefined;
}

/**
 * Build the HubSpot form submission `context` object, including
 * the tracking cookie when available.
 */
export function getHubSpotContext(pageName: string) {
  const hutk = getHubSpotUtk();
  return {
    pageUri: window.location.href,
    pageName,
    ...(hutk ? { hutk } : {}),
  };
}
