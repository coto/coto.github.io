# Security Policy

## Supported Versions

Coto Landing and Documentation site is continuously deployed via GitHub Pages from the `main` branch. Only the latest release on the default branch is actively supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| main    | :white_check_mark: |
| < main  | :x:                |

## Reporting a Vulnerability

I take the security seriously. If you believe you have discovered a security vulnerability, please report it privately through GitHub.

### How to Report

Please do **not** open a public issue or discussion to report security vulnerabilities. Instead, use GitHub's private reporting channel:

1. Go to the [Security Advisories](https://github.com/coto/coto.github.io/security/advisories) tab of this repository.
2. Click **Report a vulnerability** to start a private advisory draft.
3. Provide the details in the form:
   - A summary and clear description of the vulnerability.
   - Step-by-step instructions or proof-of-concept (PoC) to reproduce the issue.
   - Potential impact and any suggested mitigations, if known.
4. Click **Submit report**. Only repository maintainers will have access to this ticket.

### What to Expect

- **Acknowledgement:** Maintainers will review and acknowledge the ticket within **48 hours**.
- **Assessment:** Progress updates will be provided directly through the private advisory ticket every **3 to 5 business days**.
- **Resolution:** Once validated and resolved, a fix will be merged to `main` and deployed. If appropriate, a public CVE/Advisory can be credited in coordination with the reporter.
