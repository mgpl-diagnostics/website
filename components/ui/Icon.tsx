import type { IconProps as PhosphorProps, Icon as PhosphorIcon } from '@phosphor-icons/react';
import {
  ActivityIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CaretDownIcon,
  ChatCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  DownloadSimpleIcon,
  DropIcon,
  EnvelopeSimpleIcon,
  GlobeIcon,
  HandHeartIcon,
  HeartIcon,
  HeartbeatIcon,
  HouseLineIcon,
  LightningIcon,
  ListIcon,
  LockKeyIcon,
  MapPinIcon,
  MedalIcon,
  MicroscopeIcon,
  MinusIcon,
  PhoneIcon,
  PlusIcon,
  QuotesIcon,
  SealCheckIcon,
  ShieldCheckIcon,
  StarIcon,
  StethoscopeIcon,
  TestTubeIcon,
  TruckIcon,
  UsersThreeIcon,
  WhatsappLogoIcon,
  XIcon,
} from '@phosphor-icons/react/dist/ssr';

/**
 * Single icon registry. Config JSON stores icon names (kept from the
 * original Lucide names so content files don't change); this maps them
 * to Phosphor SVG icons.
 */
const REGISTRY = {
  Activity: ActivityIcon,
  ArrowLeft: ArrowLeftIcon,
  ArrowRight: ArrowRightIcon,
  ArrowUpRight: ArrowUpRightIcon,
  Award: MedalIcon,
  BadgeCheck: SealCheckIcon,
  CaretDown: CaretDownIcon,
  Chat: ChatCircleIcon,
  CheckCircle2: CheckCircleIcon,
  Clock: ClockIcon,
  Download: DownloadSimpleIcon,
  Droplets: DropIcon,
  Globe: GlobeIcon,
  Heart: HeartIcon,
  HeartHandshake: HandHeartIcon,
  HeartPulse: HeartbeatIcon,
  Home: HouseLineIcon,
  Lock: LockKeyIcon,
  Mail: EnvelopeSimpleIcon,
  MapPin: MapPinIcon,
  Menu: ListIcon,
  Microscope: MicroscopeIcon,
  Minus: MinusIcon,
  Phone: PhoneIcon,
  Plus: PlusIcon,
  Quote: QuotesIcon,
  Shield: ShieldCheckIcon,
  Star: StarIcon,
  Stethoscope: StethoscopeIcon,
  TestTube2: TestTubeIcon,
  Truck: TruckIcon,
  Users: UsersThreeIcon,
  WhatsApp: WhatsappLogoIcon,
  X: XIcon,
  Zap: LightningIcon,
} satisfies Record<string, PhosphorIcon>;

export type IconName = keyof typeof REGISTRY;

interface Props extends Omit<PhosphorProps, 'ref'> {
  name: IconName | (string & {});
  fallback?: IconName;
}

export default function Icon({ name, fallback = 'TestTube2', weight = 'light', ...rest }: Props) {
  const Cmp = REGISTRY[name as IconName] ?? REGISTRY[fallback];
  return <Cmp weight={weight} aria-hidden="true" {...rest} />;
}
