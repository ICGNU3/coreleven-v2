
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export function PrimaryButton({ 
  children, 
  variant = 'default', 
  size = 'default',
  className,
  ...props 
}: PrimaryButtonProps) {
  return (
    <Button 
      variant={variant} 
      size={size}
      className={cn(
        'font-medium transition-all duration-300',
        variant === 'default' ? 'bg-earth-500 hover:bg-earth-600 text-white' : '',
        variant === 'outline' ? 'border-earth-500 text-earth-600 hover:bg-earth-50' : '',
        variant === 'ghost' ? 'text-earth-600 hover:bg-earth-50' : '',
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
