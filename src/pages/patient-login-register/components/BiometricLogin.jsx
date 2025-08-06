import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BiometricLogin = () => {
  const [biometricSupported, setBiometricSupported] = useState(false);
  const [biometricType, setBiometricType] = useState('');

  useEffect(() => {
    // Check for biometric support
    const checkBiometricSupport = () => {
      if (window.PublicKeyCredential) {
        setBiometricSupported(true);
        // Detect biometric type based on user agent
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
          setBiometricType('Touch ID / Face ID');
        } else if (userAgent.includes('android')) {
          setBiometricType('Fingerprint');
        } else {
          setBiometricType('Biometric');
        }
      }
    };

    checkBiometricSupport();
  }, []);

  const handleBiometricLogin = async () => {
    try {
      // Simulate biometric authentication
      console.log('Biometric authentication initiated');

      // In a real implementation, you would use WebAuthn API
      // const credential = await navigator.credentials.create({
      //   publicKey: {
      //     // WebAuthn configuration
      //   }
      // });

      // For demo purposes, show success after delay
      setTimeout(() => {
        console.log('Biometric authentication successful');
      }, 1000);
    } catch (error) {
      console.error('Biometric authentication failed:', error);
    }
  };

  if (!biometricSupported) {
    return null;
  }

  return (
    <div className="mt-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-text-secondary">Or use</span>
        </div>
      </div>

      <div className="mt-4">
        <Button
          variant="outline"
          onClick={handleBiometricLogin}
          fullWidth
          className="flex items-center justify-center space-x-2"
        >
          <Icon name="Fingerprint" size={20} />
          <span>Sign in with {biometricType}</span>
        </Button>
      </div>

      <div className="mt-2 text-center">
        <p className="text-xs text-text-secondary">
          Quick and secure access using your device's biometric authentication
        </p>
      </div>
    </div>
  );
};

export default BiometricLogin;
