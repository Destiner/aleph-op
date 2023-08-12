import { getAccount, getConfig, watchAccount } from '@wagmi/core';
import type { GetAccountResult } from '@wagmi/core';
import {
  ToRefs,
  getCurrentScope,
  onScopeDispose,
  reactive,
  toRefs,
  watchEffect,
} from 'vue';

type UseAccountConfig = {
  onConnect?({
    address,
    connector,
    isReconnected,
  }: {
    address?: GetAccountResult['address'];
    connector?: GetAccountResult['connector'];
    isReconnected: boolean;
  }): void;
  onDisconnect?(): void;
};

function useAccount({
  onConnect,
  onDisconnect,
}: UseAccountConfig = {}): ToRefs<{
  address: string | undefined;
  isConnected: boolean;
}> {
  const account = reactive(getAccount());

  const unwatch = watchAccount((data) => {
    account.address = data.address;
    account.connector = data.connector;
    account.status = data.status;
    account.isConnected = data.isConnected;
    account.isConnecting = data.isConnecting;
    account.isReconnecting = data.isReconnecting;
    account.isDisconnected = data.isDisconnected;
  });

  if (getCurrentScope()) onScopeDispose(() => unwatch());

  watchEffect((onCleanup) => {
    const config = getConfig();
    const unsubscribe = config.subscribe(
      (state) => ({
        address: state.data?.account,
        connector: state.connector,
        status: state.status,
      }),
      (curr, prev) => {
        if (
          !!onConnect &&
          prev.status !== 'connected' &&
          curr.status === 'connected'
        )
          onConnect({
            address: curr.address,
            connector: curr.connector,
            isReconnected: prev.status === 'reconnecting',
          });

        if (
          !!onDisconnect &&
          prev.status === 'connected' &&
          curr.status === 'disconnected'
        )
          onDisconnect();
      },
    );

    onCleanup(() => unsubscribe());
  });

  return toRefs(account);
}

export default useAccount;
export type { UseAccountConfig };
