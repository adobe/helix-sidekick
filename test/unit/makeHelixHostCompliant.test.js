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

describe('Test makeHostHelixCompliant', () => {
  it('Detects various host patterns', () => {
    // TODO: move to proper unit test in order to use original function
    // this is a copy of function in sidekick/module.js
    const makeHostHelixCompliant = (ahost) => {
      if (!/.*\.hlx.*\.(live|page)/.test(ahost) || ahost.match(/^.*?--.*?--.*?\./gm)) {
        return ahost;
      }
      return ahost
        .replace(/^([^-.]+)-([^-.]+)-([^-.]+)\./gm, '$1-$2--$3.')
        .replace(/^([^-.]+)-([^-.]+)\./gm, '$1--$2.');
    };
    expect(makeHostHelixCompliant('abc-123.com')).to.equal('abc-123.com');
    expect(makeHostHelixCompliant('repo-owner.hlx.page')).to.equal('repo--owner.hlx.page');
    expect(makeHostHelixCompliant('repo-owner.hlx-1.page')).to.equal('repo--owner.hlx-1.page');

    expect(makeHostHelixCompliant('branch--repo--owner.hlx.page')).to.equal('branch--repo--owner.hlx.page');
    expect(makeHostHelixCompliant('branch--repo--owner.hlx-1.page')).to.equal('branch--repo--owner.hlx-1.page');

    expect(makeHostHelixCompliant('branch-dash--repo--owner.hlx.page')).to.equal('branch-dash--repo--owner.hlx.page');
    expect(makeHostHelixCompliant('branch-dash--repo--owner.hlx-1.page')).to.equal('branch-dash--repo--owner.hlx-1.page');

    expect(makeHostHelixCompliant('repo-dash--owner.hlx.page')).to.equal('repo-dash--owner.hlx.page');
    expect(makeHostHelixCompliant('repo-dash--owner.hlx-1.page')).to.equal('repo-dash--owner.hlx-1.page');

    expect(makeHostHelixCompliant('repo-dash-owner.hlx.page')).to.equal('repo-dash--owner.hlx.page');
    expect(makeHostHelixCompliant('repo-dash-owner.hlx-1.page')).to.equal('repo-dash--owner.hlx-1.page');

    expect(makeHostHelixCompliant('branch--repo-dash--owner.hlx.page')).to.equal('branch--repo-dash--owner.hlx.page');
    expect(makeHostHelixCompliant('branch--repo-dash--owner.hlx-1.page')).to.equal('branch--repo-dash--owner.hlx-1.page');

    expect(makeHostHelixCompliant('branch-dash--repo-dash--owner.hlx.page')).to.equal('branch-dash--repo-dash--owner.hlx.page');
    expect(makeHostHelixCompliant('branch-dash--repo-dash--owner.hlx-1.page')).to.equal('branch-dash--repo-dash--owner.hlx-1.page');
  });
});
