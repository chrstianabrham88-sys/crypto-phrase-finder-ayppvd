
import * as bip39 from 'bip39';
import CryptoJS from 'crypto-js';

export interface GeneratedWallet {
  mnemonic: string;
  address: string;
  privateKey: string;
}

export function generateMnemonic(): string {
  return bip39.generateMnemonic();
}

export function validateMnemonic(mnemonic: string): boolean {
  return bip39.validateMnemonic(mnemonic);
}

export function generateWalletFromMnemonic(mnemonic: string): GeneratedWallet {
  // Generate seed from mnemonic
  const seed = bip39.mnemonicToSeedSync(mnemonic);
  
  // Generate private key from seed (simplified version)
  const privateKey = CryptoJS.SHA256(seed.toString('hex')).toString();
  
  // Generate address from private key (simplified version for demo)
  const address = '0x' + CryptoJS.SHA256(privateKey).toString().substring(0, 40);
  
  return {
    mnemonic,
    address,
    privateKey
  };
}

export function generateRandomWallet(): GeneratedWallet {
  const mnemonic = generateMnemonic();
  return generateWalletFromMnemonic(mnemonic);
}
