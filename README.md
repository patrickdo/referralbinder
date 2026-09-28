# DHAI Outpatient Radiology Referral Guide

A lightweight, searchable web reference for outpatient radiology referrals, procedure ordering names, and associated CPT codes across Dignity Health Advanced Imaging (DHAI) centers.

🔗 **Live Tool:** [https://patrickdo.github.io/referralbinder/](https://patrickdo.github.io/referralbinder/)

---

## Overview

The **DHAI Referral Guide** provides referring clinicians, medical assistants, and administrative scheduling staff with quick, instant lookup access for outpatient imaging orders. It consolidates body regions, exact order nomenclature, clinical indications, and billing codes into a fast, client-side searchable table.

> **Scope Note:** This guide is intended for ambulatory outpatient radiology referrals and does not include inpatient or emergency workflows performed at affiliated Mercy Hospitals.

---

## Features

- **Instant Client-Side Search:** Real-time filtering across body regions, procedure titles, and clinical indications powered by [List.js](https://listjs.com/).
- **Protocol Quick-Links:** Direct navigation between companion DHAI protocol binders:
  - [X-ray Protocols](https://patrickdo.github.io/xrayprotocols/)
  - [Ultrasound Protocols](https://patrickdo.github.io/usprotocols/)
  - [CT & MRI Protocols](https://apps.mrgschedule.com/ctprotocols/)
- **Quick Reference Downloads:** One-click access to static reference sheets for CT and MR ordering rules.
- **Clinical Reminders:** Prominent safety and preparation guidance (e.g., adult eGFR screening thresholds for MRI contrast).
- **Zero Backend Dependencies:** Pure static HTML/CSS/JS deployable directly via GitHub Pages.

---

## File Structure

```text
referralbinder/
├── index.html          # Main HTML entrypoint and table structure
├── style.css           # Brand styles, table formatting, and responsive rules
├── script.js           # List.js initialization and dynamic data loading
├── list.min.js         # Client-side search library dependency
└── Resources/
    ├── hashtag_icon.png            # Favicon
    ├── magnifying-glass-128.png    # Search input icon
    └── trade-gothic-lt-std.otf     # Primary typography font