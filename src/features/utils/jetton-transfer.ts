
import { beginCell, Address, toNano } from "@ton/core";
import { fromDecimals } from "./decimals";
import { isValidAddress } from "./address";
import { SendTransactionRequest } from "@tonconnect/ui";
import { JettonType } from "../../zustand/wallet_store/WalletStore";
import { Accessor } from "solid-js";

export const getJettonTransaction = (
    jetton: Accessor<JettonType | undefined>,
    amountStr: Accessor<number>,
    recipientAddressStr: string,
    senderAddress: Address
): SendTransactionRequest => {
    const amount = fromDecimals(amountStr().toString(), jetton()!.decimals!);

    if (!isValidAddress(recipientAddressStr)) {
        throw new Error("Invalid recipient address");
    }

    if (amount <= 0n) {
        throw new Error("Amount must be greater than zero");
    }


    if (amount > toNano(jetton()!.balance)) {
        throw new Error("Amount exceeds balance");
    }

    const recipient = Address.parse(recipientAddressStr);

    const body = beginCell()
        .storeUint(0xf8a7ea5, 32) // operation type (jetton transfer)
        .storeUint(0, 64) // query ID
        .storeCoins(amount) // jetton amount
        .storeAddress(recipient) // recipient address
        .storeAddress(senderAddress) // sender address
        .storeUint(0, 1) // forward payload (empty)
        .storeCoins(1n) // forward TON amount (for fees)
        .storeUint(0, 1) // custom payload (empty)
        .endCell();

    return {
        validUntil: Math.floor(Date.now() / 1000) + 360, // transaction valid for 6 minutes
        messages: [
            {
                address: jetton()!.wallet_address!, // sender's jetton wallet
                amount: toNano("0.05").toString(), // estimated fee in nanoton
                payload: body.toBoc().toString("base64"), // encoded payload for the transfer
            },
        ],
    };
}


