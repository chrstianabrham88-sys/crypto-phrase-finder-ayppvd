
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/commonStyles';
import { GenerationStats } from '../types/wallet';
import Icon from './Icon';

interface StatsCardProps {
  stats: GenerationStats;
}

export default function StatsCard({ stats }: StatsCardProps) {
  const successRate = stats.totalGenerated > 0 ? (stats.walletsWithBalance / stats.totalGenerated * 100) : 0;

  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Icon name="refresh" size={24} color={colors.accent} />
        <Text style={styles.statValue}>{stats.totalGenerated.toLocaleString()}</Text>
        <Text style={styles.statLabel}>Generated</Text>
      </View>
      
      <View style={styles.statItem}>
        <Icon name="wallet" size={24} color={colors.accent} />
        <Text style={styles.statValue}>{stats.walletsWithBalance}</Text>
        <Text style={styles.statLabel}>With Balance</Text>
      </View>
      
      <View style={styles.statItem}>
        <Icon name="trending-up" size={24} color={colors.accent} />
        <Text style={styles.statValue}>{stats.highestBalance.toFixed(4)}</Text>
        <Text style={styles.statLabel}>Highest (ETH)</Text>
      </View>
      
      <View style={styles.statItem}>
        <Icon name="analytics" size={24} color={colors.accent} />
        <Text style={styles.statValue}>{successRate.toFixed(6)}%</Text>
        <Text style={styles.statLabel}>Success Rate</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.grey,
    textAlign: 'center',
  },
});
