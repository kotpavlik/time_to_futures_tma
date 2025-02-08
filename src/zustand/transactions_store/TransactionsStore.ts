import { Address, beginCell, storeMessage, toNano } from '@ton/core';
import { AxiosError } from "axios";
import { createWithSignal } from "solid-zustand";
import { immer } from "zustand/middleware/immer";
import { HandleError } from "../../features/handleError";
import { useAppStore } from "../app_store/AppStore";
import { TonApiClient } from "@ton-api/client";
import { ContractAdapter } from '@ton-api/ton-adapter';
import { mnemonicToPrivateKey } from "@ton/crypto";
import { internal, SendMode, WalletContractV5R1 } from "@ton/ton";


export type sendDataType = {
    addressSender: Address
    recipientAddress: Address
    amount: bigint
}

type useTransferTransactionsType = {
    sendTon: ({ addressSender, recipientAddress, amount }: sendDataType) => void
}

const ta = new TonApiClient({
    baseUrl: import.meta.env.VITE_TONAPI,
    apiKey: import.meta.env.VITE_TON_API_KEY, // Optional, improves limits and access
});

export const useTransferTransactions = createWithSignal<useTransferTransactionsType>()(immer((set, get) => ({
    sendTon: async ({ addressSender, recipientAddress, amount }) => {
        const { setStatus, setError } = useAppStore.getState()
        try {
            // Create an adapter for interacting with contracts
            const adapter = new ContractAdapter(ta);

            // Convert mnemonic phrase to a private key
            const mnemonics = import.meta.env.VITE_MNEMONIC_TTF.split(' '); // Replace with your mnemonic phrase
            const keyPair = await mnemonicToPrivateKey(mnemonics); // Generate key pair

            // Create a wallet contract (Wallet V5R1, other versions or contract types can be used)
            const wallet = WalletContractV5R1.create({ workchain: 0, publicKey: keyPair.publicKey });
            const contract = adapter.open(wallet); // Open the contract using the adapter
            console.log(contract)
            // Retrieve the current seqno (sequence number) for the transaction
            const seqno = await contract.getSeqno(); // Required for transaction signing

            await contract.sendTransfer({
                secretKey: keyPair.secretKey, // Sign transaction with the private key
                seqno, // Use the latest seqno
                sendMode: SendMode.PAY_GAS_SEPARATELY + SendMode.IGNORE_ERRORS, // Specify sending mode
                messages: [
                    internal({
                        to: recipientAddress, // Recipient address
                        value: amount, // Amount of TON to send
                        body: 'Example transfer body' // Optional message body
                    })
                ]
            });


        } catch (error) {
            const err = error as Error | AxiosError
            HandleError(err)
            setStatus("failed")
        }
    }
})))