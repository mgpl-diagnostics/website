// ─────────────────────────────────────────────────────────────
//  MGPL Diagnostics — Config Type Definitions
//  Every JSON file in lib/config/ is validated against these
//  interfaces at compile time via the `satisfies` operator.
// ─────────────────────────────────────────────────────────────

// ── brand.json ────────────────────────────────────────────────

export interface Brand {
  name: string;
  fullName: string;
  tagline: string;
  subTagline: string;
  description: string;
  foundedYear: number;
}

export interface LogoAsset {
  src: string;
  /** Reversed variant for navy surfaces (footer). */
  darkSrc: string;
  /** Icon + MGPL/DIAGNOSTICS without tagline, for the navbar. */
  compactSrc: string;
  compactWidth: number;
  compactHeight: number;
  width: number;
  height: number;
  navbarHeight: number;
}

export interface Assets {
  logo: LogoAsset;
}

export interface Seo {
  title: string;
  description: string;
  keywords: string;
  locale: string;
}

export interface BrandConfig {
  brand: Brand;
  assets: Assets;
  seo: Seo;
}

// ── contact.json ──────────────────────────────────────────────

export interface Phone {
  primary: string;
  primaryTel: string;
  secondary: string;
  secondaryTel: string;
  whatsapp: string;
}

export interface Email {
  info: string;
  reports: string;
}

export interface Contact {
  phone: Phone;
  email: Email;
}

export interface Address {
  line1: string;
  line2: string;
  city: string;
  state: string;
  pin: string;
  full: string;
}

export interface Maps {
  shareLink: string;
  embedSrc: string;
}

export interface Hours {
  display: string;
  short: string;
}

export interface Social {
  website: string;
  facebook: string;
  instagram: string;
  youtube: string;
}

export interface ContactConfig {
  contact: Contact;
  address: Address;
  maps: Maps;
  hours: Hours;
  social: Social;
}

// ── nav.json ──────────────────────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
}

export interface Nav {
  links: NavLink[];
  ctaLabel: string;
}

export interface BookDialogOption {
  label: string;
  description: string;
  subtext: string;
}

export interface BookTestDialog {
  heading: string;
  subtext: string;
  whatsapp: BookDialogOption;
  call: BookDialogOption;
}

export interface NavConfig {
  nav: Nav;
  bookTestDialog: BookTestDialog;
}

// ── hero.json ─────────────────────────────────────────────────

export interface HeroHeadline {
  line1: string;
  line2: string;
  line3: string;
  line4: string;
}

export interface HeroSocialProof {
  patientsServed: string;
  patientsLabel: string;
  rating: string;
  ratingOutOf: string;
  avatarInitials: string[];
}

export interface ReportMetric {
  name: string;
  value: string;
  ref: string;
  ok: boolean;
}

export interface HeroReportCard {
  title: string;
  testName: string;
  reportId: string;
  footerVerified: string;
  footerTurnaround: string;
  metrics: ReportMetric[];
}

export interface Hero {
  badge: string;
  headline: HeroHeadline;
  subtext: string;
  ctaPrimary: string;
  ctaSecondary: string;
  socialProof: HeroSocialProof;
  reportCard: HeroReportCard;
}

export interface HeroConfig {
  hero: Hero;
}

// ── metrics.json ──────────────────────────────────────────────

export interface TrustMetric {
  icon: string;
  end: number;
  suffix: string;
  label: string;
  sub: string;
}

export interface MetricsConfig {
  trustMetrics: TrustMetric[];
}

// ── services.json ─────────────────────────────────────────────

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  iconColor: string;
  iconBg: string;
}

export interface Services {
  sectionTag: string;
  heading: string;
  headingAccent: string;
  subtext: string;
  viewAllLabel: string;
  items: ServiceItem[];
}

export interface ServicesConfig {
  services: Services;
}

// ── why-choose.json ───────────────────────────────────────────

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
  iconColor: string;
  iconBg: string;
}

export interface WhyChoose {
  sectionTag: string;
  headingLine1: string;
  headingLine2: string;
  headingLine3: string;
  subtext: string;
  quote: string;
  quoteAttrib: string;
  features: FeatureItem[];
}

export interface WhyChooseConfig {
  whyChoose: WhyChoose;
}

// ── home-collection.json ──────────────────────────────────────

export interface CollectionStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface HomeCollection {
  sectionTag: string;
  heading: string;
  headingAccent: string;
  subtext: string;
  steps: CollectionStep[];
  cardTitle: string;
  cardSubtitle: string;
  features: string[];
  ctaLabel: string;
}

export interface HomeCollectionConfig {
  homeCollection: HomeCollection;
}

// ── catalogue.json ────────────────────────────────────────────

export interface CatalogueCategory {
  label: string;
  icon: string;
  color: string;
  bg: string;
}

export interface PopularTest {
  name: string;
  price: string;
  turnaround: string;
  tag: string;
}

export interface TestItem {
  name: string;
  price: string;
  turnaround: string;
  preparation: string;
  parameters?: string;
}

export interface TestGroup {
  category: string;
  tests: TestItem[];
}

export interface TestCatalogue {
  sectionTag: string;
  heading: string;
  headingAccent: string;
  popularTestsHeading: string;
  allTestsHeading: string;
  allTestsSubtext: string;
  bookLabel: string;
  preparationLabel: string;
  parametersLabel: string;
  backLabel: string;
  categories: CatalogueCategory[];
  popularTests: PopularTest[];
  allTests: TestGroup[];
}

export interface CatalogueConfig {
  testCatalogue: TestCatalogue;
}

// ── testimonials.json ─────────────────────────────────────────

export interface RatingInfo {
  score: string;
  maxScore: string;
  reviewCount: string;
}

export interface TestimonialItem {
  name: string;
  location: string;
  initials: string;
  rating: number;
  testType: string;
  text: string;
  color: string;
  bg: string;
}

export interface Testimonials {
  sectionTag: string;
  heading: string;
  headingAccent: string;
  subtext: string;
  rating: RatingInfo;
  items: TestimonialItem[];
}

export interface TestimonialsConfig {
  testimonials: Testimonials;
}

// ── doctors.json ──────────────────────────────────────────────

export interface DoctorStat {
  label: string;
  value: string;
}

export interface DoctorItem {
  name: string;
  qualification: string;
  specialization: string;
  experience: string;
  initials: string;
  color: string;
  bg: string;
}

export interface Doctors {
  sectionTag: string;
  heading: string;
  headingAccent: string;
  subtext: string;
  stats: DoctorStat[];
  items: DoctorItem[];
}

export interface DoctorsConfig {
  doctors: Doctors;
}

// ── faq.json ──────────────────────────────────────────────────

export interface FaqItem {
  q: string;
  a: string;
}

export interface Faq {
  sectionTag: string;
  heading: string;
  headingAccent: string;
  subtext: string;
  stillHaveQuestionsTitle: string;
  stillHaveQuestionsSubtext: string;
  callCtaLabel: string;
  items: FaqItem[];
}

export interface FaqConfig {
  faq: Faq;
}

// ── footer.json ───────────────────────────────────────────────

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export interface FooterColumns {
  services: FooterColumn;
  information: FooterColumn;
}

export interface QuickBook {
  heading: string;
  subtext: string;
  ctaLabel: string;
}

export interface Footer {
  emergencyText: string;
  emergencyCtaLabel: string;
  brandTagline: string;
  copyrightSuffix: string;
  footerTagline: string;
  columns: FooterColumns;
  quickBook: QuickBook;
}

export interface FooterConfig {
  footer: Footer;
}

// ── Assembled site config ─────────────────────────────────────

export type SiteConfig =
  & BrandConfig
  & ContactConfig
  & NavConfig
  & HeroConfig
  & MetricsConfig
  & ServicesConfig
  & WhyChooseConfig
  & HomeCollectionConfig
  & CatalogueConfig
  & TestimonialsConfig
  & DoctorsConfig
  & FaqConfig
  & FooterConfig;
