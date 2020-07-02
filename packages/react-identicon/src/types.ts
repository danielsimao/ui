// Copyright 2018-2020 @polkadot/react-identicon authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Prefix } from '@polkadot/util-crypto/address/types';
import React from 'react';

export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
}

export interface Props extends BaseProps {
  address: string;
  isAlternative?: boolean;
  className?: string;
  publicKey: string;
  size: number;
  style?: React.CSSProperties;
}

export interface IdentityProps extends BaseProps {
  isAlternative?: boolean;
  isHighlight?: boolean;
  onCopy?: (value: string) => void;
  prefix?: Prefix;
  size?: number;
  theme?: 'beachball' | 'empty' | 'jdenticon' | 'polkadot' | 'substrate';
  value?: string | Uint8Array | null;
}
