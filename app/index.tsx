
import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useWalletGenerator } from '../hooks/useWalletGenerator';
import { registerForPushNotificationsAsync } from '../utils/notifications';
import StatsCard from '../components/StatsCard';
import WalletCard from '../components/WalletCard';
import WalletDetailsBottomSheet from '../components/WalletDetailsBottomSheet';
import Button from '../components/Button';
import Icon from '../components/Icon';
import { WalletData } from '../types/wallet';

export default function MainScreen() {
  const {
    wallets,
    stats,
    startGeneration,
    stopGeneration,
    clearWallets,
    generateSingleWallet,
  } = useWalletGenerator();

  const [selectedWallet, setSelectedWallet] = useState<WalletData | null>(null);
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  useEffect(() => {
    // Register for push notifications on app start
    registerForPushNotificationsAsync();
  }, []);

  const handleWalletPress = (wallet: WalletData) => {
    setSelectedWallet(wallet);
    setIsDetailsVisible(true);
  };

  const handleClearWallets = () => {
    Alert.alert(
      'Clear All Data',
      'Are you sure you want to clear all generated wallets and statistics?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: clearWallets },
      ]
    );
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Crypto Wallet Hunter</Text>
        <Text style={styles.subtitle}>Generate random wallets and find hidden treasures</Text>
      </View>

      <StatsCard stats={stats} />

      <View style={styles.controlsContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.controlButton, stats.isRunning && styles.stopButton]}
            onPress={stats.isRunning ? stopGeneration : startGeneration}
          >
            <Icon 
              name={stats.isRunning ? "stop" : "play"} 
              size={20} 
              color={colors.text} 
            />
            <Text style={styles.controlButtonText}>
              {stats.isRunning ? 'Stop' : 'Start'} Auto Generation
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={generateSingleWallet}
            disabled={stats.isRunning}
          >
            <Icon name="add" size={20} color={colors.text} />
            <Text style={styles.secondaryButtonText}>Generate One</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={handleClearWallets}
            disabled={stats.isRunning}
          >
            <Icon name="trash" size={20} color={colors.text} />
            <Text style={styles.secondaryButtonText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.walletsHeader}>
        <Text style={styles.walletsTitle}>Recent Wallets ({wallets.length})</Text>
        {wallets.filter(w => w.balance > 0).length > 0 && (
          <View style={styles.foundBadge}>
            <Icon name="wallet" size={16} color={colors.accent} />
            <Text style={styles.foundText}>
              {wallets.filter(w => w.balance > 0).length} with balance
            </Text>
          </View>
        )}
      </View>

      <ScrollView style={styles.walletsList} showsVerticalScrollIndicator={false}>
        {wallets.length === 0 ? (
          <View style={styles.emptyState}>
            <Icon name="wallet-outline" size={64} color={colors.grey} />
            <Text style={styles.emptyText}>No wallets generated yet</Text>
            <Text style={styles.emptySubtext}>
              Tap "Generate One" or start auto generation to begin hunting for crypto treasures!
            </Text>
          </View>
        ) : (
          wallets.map((wallet, index) => (
            <WalletCard
              key={`${wallet.address}-${index}`}
              wallet={wallet}
              onPress={() => handleWalletPress(wallet)}
            />
          ))
        )}
      </ScrollView>

      <WalletDetailsBottomSheet
        wallet={selectedWallet}
        isVisible={isDetailsVisible}
        onClose={() => setIsDetailsVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.grey,
    textAlign: 'center',
    lineHeight: 22,
  },
  controlsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 12,
  },
  controlButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  stopButton: {
    backgroundColor: '#FF6B6B',
  },
  controlButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundAlt,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.grey + '30',
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  walletsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  walletsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  foundBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  foundText: {
    fontSize: 12,
    color: colors.accent,
    fontWeight: '600',
  },
  walletsList: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.grey,
    textAlign: 'center',
    lineHeight: 20,
  },
});
