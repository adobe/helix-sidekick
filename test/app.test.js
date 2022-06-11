/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* eslint-disable no-unused-expressions */
/* global describe it */

import { expect } from '@esm-bundle/chai';

describe('Test sidekick bookmarklet', () => {
  it('Launch sidekick', async () => {
    const loc = document.body.appendChild(document.createElement('input'));
    loc.type = 'hidden';
    loc.id = 'sidekick_test_location';
    loc.value = 'https://main--bar--foo.hlx.page/';

    /* ** Helix Sidekick Bookmarklet ** */
    const c = { owner: 'foo', repo: 'bar', ref: 'main' };
    const s = document.createElement('script');
    s.id = 'hlx-sk-app';
    s.src = 'src/sidekick/app.js';
    s.dataset.config = JSON.stringify(c);
    if (document.getElementById('hlx-sk-app')) {
      document.getElementById('hlx-sk-app').replaceWith(s);
    } else {
      document.head.append(s);
    }

    await new Promise((resolve) => {
      window.setTimeout(resolve, 1000);
    });
    expect(window.hlx.sidekick).to.exist;
  });
});
