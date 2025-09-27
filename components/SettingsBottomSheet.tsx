
import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { colors } from '../styles/commonStyles';
import SimpleBottomSheet from './BottomSheet';
import Icon from './Icon';

interface SettingsBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function SettingsBottomSheet({ isVisible, onClose }: SettingsBottomSheetProps) {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [autoGenSpeed, setAutoGenSpeed] = React.useState('normal');

  const speeds = [
    { key: 'slow', label: 'Slow (1s)', value: 1000 },
    { key: 'normal', label: 'Normal (0.5s)', value: 500 },
    { key: 'fast', label: 'Fast (0.2s)', value: 200 },
  ];

  return (
    <SimpleBottomSheet isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Icon name="notifications" size={20} color={colors.accent} />
              <Text style={styles.settingLabel}>Push Notifications</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: colors.grey + '30', true: colors.accent + '50' }}
              thumbColor={notificationsEnabled ? colors.accent : colors.grey}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Icon name="volume-high" size={20} color={colors.accent} />
              <Text style={styles.settingLabel}>Sound Alerts</Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: colors.grey + '30', true: colors.accent + '50' }}
              thumbColor={soundEnabled ? colors.accent : colors.grey}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Generation Speed</Text>
          {speeds.map((speed) => (
            <TouchableOpacity
              key={speed.key}
              style={styles.speedOption}
              onPress={() => setAutoGenSpeed(speed.key)}
            >
              <View style={styles.speedInfo}>
                <Icon 
                  name={autoGenSpeed === speed.key ? "radio-button-on" : "radio-button-off"} 
                  size={20} 
                  color={autoGenSpeed === speed.key ? colors.accent : colors.grey} 
                />
                <Text style={styles.speedLabel}>{speed.label}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <View style={styles.aboutItem}>
            <Icon name="information-circle" size={20} color={colors.accent} />
            <View style={styles.aboutText}>
              <Text style={styles.aboutTitle}>Crypto Wallet Hunter</Text>
              <Text style={styles.aboutDescription}>
                This app generates random mnemonic phrases and checks for wallet balances. 
                The balance checking is simulated for demonstration purposes.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.warningSection}>
          <Icon name="warning" size={24} color={colors.warning} />
          <Text style={styles.warningText}>
            This app is for educational purposes only. In reality, finding wallets with balances 
            is extremely rare and computationally intensive.
          </Text>
        </View>
      </View>
    </SimpleBottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 8,
    marginBottom: 8,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  speedOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 8,
    marginBottom: 8,
  },
  speedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  speedLabel: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 12,
  },
  aboutItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 8,
  },
  aboutText: {
    flex: 1,
    marginLeft: 12,
  },
  aboutTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  aboutDescription: {
    fontSize: 14,
    color: colors.grey,
    lineHeight: 20,
  },
  warningSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.warning + '20',
    padding: 16,
    borderRadius: 8,
    marginTop: 12,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: colors.warning,
    marginLeft: 12,
    lineHeight: 20,
  },
});
