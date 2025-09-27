
export interface WalletData {
  mnemonic: string;
  address: string;
  privateKey: string;
  balance: number;
  timestamp: Date;
}

export interface GenerationStats {
  totalGenerated: number;
  walletsWithBalance: number;
  highestBalance: number;
  isRunning: boolean;
}
