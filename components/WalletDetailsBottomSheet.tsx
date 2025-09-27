
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../styles/commonStyles';
import { WalletData } from '../types/wallet';
import SimpleBottomSheet from './BottomSheet';
import Icon from './Icon';

interface WalletDetailsBottomSheetProps {
  wallet: WalletData | null;
  isVisible: boolean;
  onClose: () => void;
}

export default function WalletDetailsBottomSheet({ 
  wallet, 
  isVisible, 
  onClose 
}: WalletDetailsBottomSheetProps) {
  if (!wallet) return null;

  const copyToClipboard = (text: string, label: string) => {
    // In a real app, you'd use Clipboard API
    console.log(`Copied ${label}: ${text}`);
  };

  return (
    <SimpleBottomSheet isVisible={isVisible} onClose={onClose}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Wallet Details</Text>
          {wallet.balance > 0 && (
            <View style={styles.balanceBadge}>
              <Icon name="wallet" size={16} color={colors.accent} />
              <Text style={styles.balanceText}>{wallet.balance.toFixed(4)} ETH</Text>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Address</Text>
          <TouchableOpacity 
            style={styles.copyableField}
            onPress={() => copyToClipboard(wallet.address, 'Address')}
          >
            <Text style={styles.fieldText}>{wallet.address}</Text>
            <Icon name="copy" size={16} color={colors.grey} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Private Key</Text>
          <TouchableOpacity 
            style={styles.copyableField}
            onPress={() => copyToClipboard(wallet.privateKey, 'Private Key')}
          >
            <Text style={styles.fieldText}>{wallet.privateKey}</Text>
            <Icon name="copy" size={16} color={colors.grey} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mnemonic Phrase</Text>
          <TouchableOpacity 
            style={styles.copyableField}
            onPress={() => copyToClipboard(wallet.mnemonic, 'Mnemonic')}
          >
            <Text style={styles.mnemonicText}>{wallet.mnemonic}</Text>
            <Icon name="copy" size={16} color={colors.grey} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Generated</Text>
          <Text style={styles.timestampText}>
            {wallet.timestamp.toLocaleString()}
          </Text>
        </View>

        {wallet.balance > 0 && (
          <View style={styles.warningSection}>
            <Icon name="warning" size={24} color="#FF6B6B" />
            <Text style={styles.warningText}>
              This wallet contains funds! Make sure to secure the private key and mnemonic phrase.
            </Text>
          </View>
        )}
      </ScrollView>
    </SimpleBottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  balanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.accent + '20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  balanceText: {
    fontSize: 14,
    color: colors.accent,
    fontWeight: '600',
    marginLeft: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  copyableField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.grey + '30',
  },
  fieldText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    fontFamily: 'monospace',
    marginRight: 8,
  },
  mnemonicText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
    marginRight: 8,
  },
  timestampText: {
    fontSize: 14,
    color: colors.grey,
  },
  warningSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B20',
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#FF6B6B',
    marginLeft: 12,
    lineHeight: 20,
  },
});
