
import { useIsMobile } from './use-mobile';
import { useAuth } from '@/contexts/AuthContext';

export const useMobileNavigation = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();

  const getNavigationStyle = () => {
    if (!isMobile) return 'desktop';
    return 'mobile';
  };

  const shouldShowBottomNav = () => {
    return isMobile && user;
  };

  return {
    isMobile,
    getNavigationStyle,
    shouldShowBottomNav,
  };
};
