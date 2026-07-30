export type Cta = { label: string; href: string };

export type NavItem = { label: string; href: string };

export type Settings = {
  businessName: string;
  tagline: string;
  logo: string;
  colors: {
    primary: string;
    secondary: string;
    beige: string;
    cream: string;
    dark: string;
    gold: string;
  };
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  social: { instagram: string; facebook: string; tiktok: string };
  nav: NavItem[];
  footer: { note: string; copyright: string };
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
};

export type Home = {
  hero: {
    image: string;
    /** Empty falls back to settings.logo. */
    logo: string;
    logoAlt: string;
    kicker: string;
    title: string;
    subtitle: string;
    primaryCta: Cta;
    secondaryCta: Cta;
  };
  about: {
    image: string;
    sideImage: string;
    intro: string;
    body: string;
    highlight: string;
  };
  featured: { title: string; subtitle: string; items: Product[] };
  menuPreview: { title: string; subtitle: string; cta: Cta };
};

export type About = {
  hero: { title: string; subtitle: string; image: string };
  history: { title: string; text: string; image: string };
  mission: { title: string; text: string };
  vision: { title: string; text: string };
  values: { title: string; text: string }[];
  team: { name: string; role: string; image: string }[];
};

export type GalleryItem = { id: string; src: string; alt: string; category: string };
export type Gallery = { title: string; subtitle: string; items: GalleryItem[] };

export type MenuCategory = { id: string; name: string; products: Product[] };
export type Menu = { title: string; subtitle: string; categories: MenuCategory[] };

export type Contact = {
  title: string;
  subtitle: string;
  address: string;
  phone: string;
  email: string;
  mapEmbed: string;
  mapPlaceholder: string;
  schedule: { day: string; hours: string }[];
  form: {
    title: string;
    successMessage: string;
    fields: { name: string; email: string; message: string };
    submitLabel: string;
  };
};

export type ContentMap = {
  settings: Settings;
  home: Home;
  about: About;
  gallery: Gallery;
  menu: Menu;
  contact: Contact;
};

export type ContentKey = keyof ContentMap;
