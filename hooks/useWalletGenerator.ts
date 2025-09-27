
import { useState, useCallback, useRef } from 'react';
import { WalletData, GenerationStats } from '../types/wallet';
import { generateRandomWallet } from '../utils/walletGenerator';
import { checkWalletBalance } from '../utils/balanceChecker';
import { sendWalletFoundNotification, sendGenerationStatsNotification } from '../utils/notifications';

export function useWalletGenerator() {
  const [wallets, setWallets] = useState<WalletData[]>([]);
  const [stats, setStats] = useState<GenerationStats>({
    totalGenerated: 0,
    walletsWithBalance: 0,
    highestBalance: 0,
    isRunning: false,
  });
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isRunningRef = useRef(false);

  const generateAndCheckWallet = useCallback(async () => {
    try {
      const wallet = generateRandomWallet();
      const balance = await checkWalletBalance(wallet.address);
      
      const walletData: WalletData = {
        ...wallet,
        balance,
        timestamp: new Date(),
      };

      setWallets(prev => [walletData, ...prev.slice(0, 99)]); // Keep only last 100 wallets
      
      setStats(prev => {
        const newStats = {
          ...prev,
          totalGenerated: prev.totalGenerated + 1,
          walletsWithBalance: balance > 0 ? prev.walletsWithBalance + 1 : prev.walletsWithBalance,
          highestBalance: Math.max(prev.highestBalance, balance),
        };
        
        // Send notifications
        if (balance > 0) {
          sendWalletFoundNotification(wallet.address, balance);
          console.log(`🎉 Found wallet with balance: ${wallet.address} - ${balance} ETH`);
        }
        
        sendGenerationStatsNotification(newStats.totalGenerated, newStats.walletsWithBalance);
        
        return newStats;
      });
      
    } catch (error) {
      console.error('Error generating wallet:', error);
    }
  }, []);

  const startGeneration = useCallback(() => {
    if (isRunningRef.current) return;
    
    isRunningRef.current = true;
    setStats(prev => ({ ...prev, isRunning: true }));
    
    // Generate wallets every 500ms
    intervalRef.current = setInterval(generateAndCheckWallet, 500);
    console.log('Started wallet generation');
  }, [generateAndCheckWallet]);

  const stopGeneration = useCallback(() => {
    if (!isRunningRef.current) return;
    
    isRunningRef.current = false;
    setStats(prev => ({ ...prev, isRunning: false }));
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    console.log('Stopped wallet generation');
  }, []);

  const clearWallets = useCallback(() => {
    setWallets([]);
    setStats({
      totalGenerated: 0,
      walletsWithBalance: 0,
      highestBalance: 0,
      isRunning: stats.isRunning,
    });
    console.log('Cleared all wallets and stats');
  }, [stats.isRunning]);

  const generateSingleWallet = useCallback(async () => {
    await generateAndCheckWallet();
  }, [generateAndCheckWallet]);

  return {
    wallets,
    stats,
    startGeneration,
    stopGeneration,
    clearWallets,
    generateSingleWallet,
  };
}
