// Copyright 2017-2023 @polkadot/ui-keyring authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { KeyringJson, KeyringStore } from '../types';

import fs from 'fs';
import mkdirp from 'mkdirp';
import path from 'path';

import { assert } from '@polkadot/util';

// NOTE untested and unused by any known apps, probably broken in various mysterious ways
export class FileStore implements KeyringStore {
  #path: string;

  constructor (path: string) {
    if (!fs.existsSync(path)) {
      mkdirp.sync(path);
    }

    this.#path = path;
  }

  public all (fn: (key: string, value: KeyringJson) => void): void {
    fs
      .readdirSync(this.#path)
      .filter((key): boolean => !['.', '..', '.DS_Store'].includes(key))
      .forEach((key): void => {
        const value = this._readKey(key);

        value?.address && fn(key, value);
      });
  }

  public get (key: string, fn: (value: KeyringJson) => void): void {
    const value = this._readKey(key);

    assert(value?.address, `Invalid JSON found for ${key}`);

    fn(value);
  }

  public remove (key: string, fn?: () => void): void {
    fs.unlinkSync(this._getPath(key));
    fn && fn();
  }

  public set (key: string, value: KeyringJson, fn?: () => void): void {
    fs.writeFileSync(this._getPath(key), Buffer.from(JSON.stringify(value), 'utf-8'));
    fn && fn();
  }

  private _getPath (key: string): string {
    return path.join(this.#path, key);
  }

  private _readKey (key: string): KeyringJson | undefined {
    try {
      return JSON.parse(
        fs.readFileSync(this._getPath(key)).toString('utf-8')
      ) as KeyringJson;
    } catch (error) {
      console.error(error);
    }

    return undefined;
  }
}
