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
/* eslint-env mocha */

'use strict';

const assert = require('assert');

const {
  IT_DEFAULT_TIMEOUT,
  startBrowser,
  stopBrowser,
} = require('./utils.js');
const { SidekickTest } = require('./SidekickTest.js');

describe('Test user auth handling', () => {
  beforeEach(startBrowser);
  afterEach(stopBrowser);

  it('Handles 401 status from admin API', async () => {
    const { checkPageResult } = await new SidekickTest({
      apiResponses: [{
        status: 401,
      }],
      checkPage: (p) => p.evaluate(() => window.hlx.sidekick.shadowRoot
        .querySelector('.hlx-sk-overlay .modal')
        .classList.contains('modal-login')),
    }).run();
    assert.ok(checkPageResult, 'Did not show login dialog on 401');
  }).timeout(IT_DEFAULT_TIMEOUT);

  it('Handles 403 status from admin API', async () => {
    const test = new SidekickTest({
      checkPage: (p) => p.evaluate(() => window.hlx.sidekick.shadowRoot
        .querySelector('.hlx-sk-overlay .modal')
        .classList.contains('modal-user-switch')),
    });
    test.apiResponses[0].edit.status = 403;
    const { plugins, checkPageResult } = await test.run();
    assert.ok(checkPageResult, 'Did not show user switch dialog on 403');
    assert.ok(plugins.find((p) => p.id === 'user-switch'), 'Did not show user switch option');
  }).timeout(IT_DEFAULT_TIMEOUT);

  it('Shows user info from profile', async () => {
    const { checkPageResult } = await new SidekickTest({
      checkPage: (p) => p.evaluate(() => [...window.hlx.sidekick.get('user')
        .querySelectorAll(':scope .dropdown-container > div > div')]
        .map((div) => div.textContent)
        .join('---') === 'Jane Smith---jane@foo.bar'),
    }).run();
    assert.ok(checkPageResult, 'Did not show user info from profile');
  }).timeout(IT_DEFAULT_TIMEOUT);

  it('Shows login option in user menu if user not logged in', async () => {
    const { plugins } = await new SidekickTest({
      apiResponses: [{
        status: 401,
      }],
    }).run();
    assert.ok(plugins.find((p) => p.id === 'user-login'), 'Did not show login option');
  }).timeout(IT_DEFAULT_TIMEOUT);

  it('Shows logout option in user menu if user logged in', async () => {
    const { plugins } = await new SidekickTest().run();
    assert.ok(plugins.find((p) => p.id === 'user-logout'), 'Did not show logout option');
  }).timeout(IT_DEFAULT_TIMEOUT);
});
