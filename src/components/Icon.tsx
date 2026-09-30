import {
  Users, UserCheck, CalendarClock, Briefcase, Clock, CalendarDays, Wallet,
  UserPlus, TrendingUp, BarChart3, Settings, LayoutDashboard, Search,
  CheckSquare, Bell, ChevronRight, ChevronLeft, X, Check, Filter, Download,
  MoreHorizontal, Mail, Phone, MapPin, Calendar, Building2, Award, Target,
  Zap, AlertTriangle, Info, Circle, Dot, ArrowUpRight, ArrowDownRight,
  Plus, Star, Home, LogOut, Moon, HelpCircle, FileText, DollarSign,
  Percent, Activity as ActivityIcon, User, UserX, Shield, CreditCard, Globe,
  Bell as BellIcon, Palette, Database, ArrowRight, Menu, Sparkles,
  CheckCircle2, XCircle, Clock3, PartyPopper, Cake, Users2, GraduationCap,
  Video, Send, Lock, Eye, EyeOff, ChevronDown, SlidersHorizontal,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { CSSProperties } from 'react';

const iconMap: Record<string, LucideIcon> = {
  Users, UserCheck, CalendarClock, Briefcase, Clock, CalendarDays, Wallet,
  UserPlus, TrendingUp, BarChart3, Settings, LayoutDashboard, Search,
  CheckSquare, Bell, ChevronRight, ChevronLeft, X, Check, Filter, Download,
  MoreHorizontal, Mail, Phone, MapPin, Calendar, Building2, Award, Target,
  Zap, AlertTriangle, Info, Circle, Dot, ArrowUpRight, ArrowDownRight,
  Plus, Star, Home, LogOut, Moon, HelpCircle, FileText, DollarSign,
  Percent, ActivityIcon, User, UserX, Shield, CreditCard, Globe,
  BellIcon, Palette, Database, ArrowRight, Menu, Sparkles,
  CheckCircle2, XCircle, Clock3, PartyPopper, Cake, Users2, GraduationCap,
  Video, Send, Lock, Eye, EyeOff, ChevronDown, SlidersHorizontal,
};

export function Icon({
  name, size = 18, className = '', style,
}: { name: string; size?: number; className?: string; style?: CSSProperties }) {
  const Cmp = iconMap[name] ?? Circle;
  return <Cmp size={size} className={className} style={style} />;
}
