# DNS ROLLBACK — Carisma Slimming (carismaslimming.com)

> **PURPOSE: RESTORE THESE EXACT RECORDS TO ROLL BACK TO WIX.**
> If the Vercel cutover fails, recreate the records below verbatim at the
> authoritative DNS provider to return the domain to the live Wix site.
>
> **Captured:** 2026-06-21 (audit-only snapshot, AUDIT-ONLY authority — no live changes made)
> **Captured by:** Agent 1 — DNS & Cutover Safety
> **Method:** `dig` against public resolver + authoritative `@ns12.wixdns.net`, `whois`, `curl`

---

## CRITICAL: Where DNS lives today

DNS is hosted **AT WIX nameservers**. To restore, records must be re-entered in the
Wix DNS zone (or, if NS were changed during cutover, the nameservers below must be
restored FIRST at the registrar, then the zone records re-created).

**Registrar:** Wix.com Ltd.
**Registry expiry:** 2026-12-27

### Nameservers (NS) — RESTORE THESE FIRST IF CHANGED
```
carismaslimming.com.   NS   ns12.wixdns.net.
carismaslimming.com.   NS   ns13.wixdns.net.
```
(Confirmed identical at registrar via whois and in-zone via dig.)

### SOA (for reference — auto-managed by Wix, do not hand-create)
```
carismaslimming.com. 3600 IN SOA ns12.wixdns.net. support.wix.com. 2025122710 10800 3600 1209600 3600
```

---

## EXACT RECORDS TO RESTORE (verbatim, as live on 2026-06-21)

### Apex A records (carismaslimming.com) — Wix hosting IPs, TTL 3600
```
carismaslimming.com.   3600   IN   A   185.230.63.171
carismaslimming.com.   3600   IN   A   185.230.63.107
carismaslimming.com.   3600   IN   A   185.230.63.186
```

### www CNAME (www.carismaslimming.com) — Wix CDN, TTL 3600
```
www.carismaslimming.com.   3600   IN   CNAME   cdn1.wixdns.net.
```
(Resolution chain for verification: `www → cdn1.wixdns.net → td-ccm-neg-87-45.wixdns.net → 34.149.87.45`)

### MX records (Google Workspace email) — TTL 3600 — DO NOT TOUCH DURING CUTOVER
```
carismaslimming.com.   3600   IN   MX   10 aspmx.l.google.com.
carismaslimming.com.   3600   IN   MX   20 alt1.aspmx.l.google.com.
carismaslimming.com.   3600   IN   MX   30 alt2.aspmx.l.google.com.
carismaslimming.com.   3600   IN   MX   40 alt3.aspmx.l.google.com.
carismaslimming.com.   3600   IN   MX   50 alt4.aspmx.l.google.com.
```
> Email is on Google Workspace. The website cutover MUST NOT modify or remove MX
> records. If NS are switched away from Wix, these MX records (and TXT below) must
> be replicated at the new DNS host or email WILL break.

### TXT records — TTL 1800 — preserve verbatim (SPF + domain verifications)
```
carismaslimming.com. 1800 IN TXT "v=spf1 include:_spf.google.com include:one.zoho.eu ~all"
carismaslimming.com. 1800 IN TXT "v=spf1 include:one.zoho.eu ~all"
carismaslimming.com. 1800 IN TXT "v=spf1 include:_spf.google.com ~all"
carismaslimming.com. 1800 IN TXT "google-site-verification=xijoaWQoe_1u5KipWQ9dF29tulUlY1x2HUtrtS59R6s"
carismaslimming.com. 1800 IN TXT "google-site-verification=41UWS6IMS18YlyvQ19XXaxAcYvLAwd99SEi7Alnkq-c"
```
> NOTE: Three separate SPF (`v=spf1`) TXT records currently coexist. RFC 7208
> permits only ONE SPF record per domain — multiple SPF records is a PERMERROR.
> This is a pre-existing email-deliverability issue, flagged for Agent owning email,
> NOT to be "fixed" as part of this rollback. Restore them exactly as-is on rollback.

### CAA records
```
(none present — dig CAA returned no records on 2026-06-21)
```

---

## ROLLBACK PROCEDURE
1. If nameservers were changed at the registrar (Wix.com Ltd.), set them back to
   `ns12.wixdns.net` and `ns13.wixdns.net`. Wait for NS propagation.
2. In the Wix DNS zone, ensure the apex A records, www CNAME, MX, and TXT above
   exist exactly as listed.
3. Verify: `dig carismaslimming.com A` returns the three 185.230.63.x IPs and
   `dig www.carismaslimming.com CNAME` returns `cdn1.wixdns.net.`
4. Verify redirect + live site: `curl -sIL https://carismaslimming.com` should
   301 → `https://www.carismaslimming.com/` and serve `server: Pepyaka` (Wix), HTTP 200.
5. Verify email unaffected: `dig carismaslimming.com MX` returns the 5 Google MX.
