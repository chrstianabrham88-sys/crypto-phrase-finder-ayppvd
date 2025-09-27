
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../styles/commonStyles';
import { WalletData } from '../types/wallet';
import Icon from './Icon';

interface WalletCardProps {
  wallet: WalletData;
  onPress?: () => void;
}

export default function WalletCard({ wallet, onPress }: WalletCardProps) {
  const hasBalance = wallet.balance > 0;

  return (
    <TouchableOpacity style={[styles.card, hasBalance && styles.balanceCard]} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>Address:</Text>
          <Text style={styles.address}>{wallet.address.substring(0, 20)}...</Text>
        </View>
        {hasBalance && (
          <View style={styles.balanceContainer}>
            <Icon name="wallet" size={20} color={colors.accent} />
            <Text style={styles.balance}>{wallet.balance.toFixed(4)} ETH</Text>
          </View>
        )}
      </View>
      
      <View style={styles.mnemonicContainer}>
        <Text style={styles.mnemonicLabel}>Mnemonic:</Text>
        <Text style={styles.mnemonic} numberOfLines={2}>
          {wallet.mnemonic}
        </Text>
      </View>
      
      <Text style={styles.timestamp}>
        Generated: {wallet.timestamp.toLocaleTimeString()}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.grey + '30',
  },
  balanceCard: {
    borderColor: colors.accent,
    borderWidth: 2,
    backgroundColor: colors.accent + '10',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  addressContainer: {
    flex: 1,
  },
  addressLabel: {
    fontSize: 12,
    color: colors.grey,
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: colors.text,
    fontFamily: 'monospace',
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  balance: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: '600',
    marginLeft: 4,
  },
  mnemonicContainer: {
    marginBottom: 12,
  },
  mnemonicLabel: {
    fontSize: 12,
    color: colors.grey,
    marginBottom: 4,
  },
  mnemonic: {
    fontSize: 12,
    color: colors.text,
    fontFamily: 'monospace',
    lineHeight: 16,
  },
  timestamp: {
    fontSize: 11,
    color: colors.grey,
    textAlign: 'right',
  },
});
