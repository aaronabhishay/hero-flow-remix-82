import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Mail, Lock, User, ArrowLeft, HelpCircle, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For demo purposes, navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen hero-bg relative overflow-hidden flex items-center justify-center p-4">
      {/* Floating Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="floating-orb absolute opacity-20"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          />
        ))}
      </div>

      {/* Interactive Gradient Following Mouse */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.1), transparent 40%)`,
        }}
      />

      {/* Logo */}
      <div className="absolute top-8 left-8 z-20">
        <div className="text-2xl font-bold gradient-text">NEXUS</div>
      </div>

      {/* Help Link */}
      <div className="absolute bottom-8 right-8 z-20">
        <Link 
          to="/"
          className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 text-sm group"
        >
          <HelpCircle className="w-4 h-4 group-hover:animate-pulse" />
          Need help?
        </Link>
      </div>

      {/* Back to Homepage */}
      <div className="absolute bottom-8 left-8 z-20">
        <Link 
          to="/"
          className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center gap-2 text-sm group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to homepage
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Sign Up Card */}
          <Card className={`glass-card p-8 relative overflow-hidden transition-all duration-700 animate-slide-up ${!isLogin ? 'ring-2 ring-primary/50 shadow-glow-primary' : ''}`}>
            <div className="absolute inset-0 bg-gradient-primary-subtle opacity-50 blur-xl" />
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold gradient-text mb-2">Create Account</h2>
                <p className="text-muted-foreground">Join the future of innovation</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
                    <Input
                      placeholder="Full Name"
                      className="pl-12 h-12 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/25 focus:shadow-glow transition-all duration-300"
                    />
                  </div>
                  
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      className="pl-12 h-12 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/25 focus:shadow-glow transition-all duration-300"
                    />
                  </div>

                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="pl-12 pr-12 h-12 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/25 focus:shadow-glow transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="premium" 
                  size="lg" 
                  className="w-full h-12 text-lg hover:scale-105 active:scale-95 transition-transform duration-200"
                  onClick={() => setIsLogin(false)}
                >
                  <span className="relative z-10">Create Account</span>
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsLogin(true)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Already have an account? <span className="gradient-text font-semibold">Sign In</span>
                  </button>
                </div>
              </form>
            </div>
          </Card>

          {/* Login Card */}
          <Card className={`glass-card p-8 relative overflow-hidden transition-all duration-700 animate-slide-up-delay ${isLogin ? 'ring-2 ring-primary/50 shadow-glow-primary' : ''}`}>
            <div className="absolute inset-0 bg-gradient-primary-subtle opacity-50 blur-xl" />
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold gradient-text mb-2">Welcome Back</h2>
                <p className="text-muted-foreground">Access your neural interface</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
                    <Input
                      type="email"
                      placeholder="Email Address"
                      className="pl-12 h-12 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/25 focus:shadow-glow transition-all duration-300"
                    />
                  </div>

                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 group-focus-within:text-primary transition-colors" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="pl-12 pr-12 h-12 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/25 focus:shadow-glow transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="sr-only"
                    />
                    <div className="w-4 h-4 border border-border rounded bg-background/50 group-hover:border-primary/50 transition-colors flex items-center justify-center">
                      <div className="w-2 h-2 bg-primary rounded-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button 
                  type="submit" 
                  variant="premium" 
                  size="lg" 
                  className="w-full h-12 text-lg hover:scale-105 active:scale-95 transition-transform duration-200"
                >
                  <span className="relative z-10">Access Neural Interface</span>
                </Button>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setIsLogin(false)}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    Don't have an account? <span className="gradient-text font-semibold">Sign Up</span>
                  </button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;