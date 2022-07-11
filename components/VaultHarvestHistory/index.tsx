import { Network } from '@badger-dao/sdk';
import React, { useState } from 'react';
import { VaultHarvestInfo } from '../../interfaces/vault-harvest-info.interface';
import { getChainExplorer, shortenAddress } from '../../utils';

const PAGE_SIZE = 10;

interface Props {
  network: Network;
  harvests: VaultHarvestInfo[];
}

function VaultHarvestHistory({ network, harvests }: Props): JSX.Element {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  const maxHarvestPages = harvests.length / PAGE_SIZE - 1;
  const [harvestPage, setHarvestPage] = useState(0);

  return (
    <div className="bg-card mt-4 p-3 md:p-4 rounded-lg mx-2 lg:mx-0">
    <div className="text-xs text-gray-400">Vault Harvest History</div>
    <div className="mt-2">
      <div className="md:grid hidden md:grid-cols-6 p-1">
        <div>Date</div>
        <div>Reward Type</div>
        <div>Value</div>
        <div>Amount</div>
        <div>APR</div>
        <div>Transaction</div>
      </div>
      {harvests
        .slice(harvestPage * PAGE_SIZE, harvestPage + 1 * PAGE_SIZE + 1)
        .map((h, i) => {
          return (
            <div
              key={`harvest-${h.token}-${i}`}
              className="grid grid-cols-1 md:grid-cols-6 py-1"
            >
              <div>{new Date(h.timestamp * 1000).toLocaleString()}</div>
              <div>{h.rewardType}</div>
              <div>{formatter.format(h.value)}</div>
              <div>
                {h.amount.toFixed(3)} {h.token}
              </div>
              <div>{isNaN(h.apr) || !h.apr ? 0 : h.apr.toFixed(2)}%</div>
              <div className="text-mint">
                <a
                  className="flex"
                  href={`${getChainExplorer(network)}/tx/${h.hash}`}
                  target="_blank"
                >
                  {shortenAddress(h.hash, 8)}
                  <svg
                    className="ml-2 mt-1"
                    fill="#3bba9c"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="15px"
                    height="15px"
                  >
                    <path d="M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 12 L 19 12 L 19 19 L 5 19 L 5 5 L 12 5 L 12 3 L 5 3 z M 14 3 L 14 5 L 17.585938 5 L 8.2929688 14.292969 L 9.7070312 15.707031 L 19 6.4140625 L 19 10 L 21 10 L 21 3 L 14 3 z" />
                  </svg>
                </a>
              </div>
            </div>
          );
        })}
      <div className="flex my-2 justify-center items-center">
        <svg
          onClick={() => {
            if (harvestPage > 0) {
              setHarvestPage(harvestPage - 1);
            }
          }}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${
            harvestPage > 0
              ? 'hover:text-mint cursor-pointer'
              : 'opacity-50'
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <div className="font-semibold font-gray-400 text-sm mx-2">
          {harvestPage + 1}
        </div>
        <svg
          onClick={() => {
            if (harvestPage + 1 < maxHarvestPages) {
              setHarvestPage(harvestPage + 1);
            }
          }}
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${
            harvestPage < maxHarvestPages
              ? 'hover:text-mint cursor-pointer'
              : 'opacity-50'
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  </div>
  );
}

export default VaultHarvestHistory;
