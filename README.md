**This code has moved to [@adobe/helix-sidekick-extension](https://github.com/adobe/helix-sidekick-extension)**

# Franklin Sidekick

> Browser-based helper for authoring Franklin projects



## Status
[![codecov](https://img.shields.io/codecov/c/github/adobe/helix-sidekick.svg)](https://codecov.io/gh/adobe/helix-sidekick)
[![CircleCI](https://img.shields.io/circleci/project/github/adobe/helix-sidekick.svg)](https://circleci.com/gh/adobe/helix-sidekick)
[![GitHub license](https://img.shields.io/github/license/adobe/helix-sidekick.svg)](https://github.com/adobe/helix-sidekick/blob/master/LICENSE.txt)
[![GitHub issues](https://img.shields.io/github/issues/adobe/helix-sidekick.svg)](https://github.com/adobe/helix-sidekick/issues)
[![LGTM Code Quality Grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/adobe/helix-sidekick.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/adobe/helix-sidekick)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Installation

### Bookmarklet

Navigate to https://www.hlx.live/tools/sidekick/ and follow the instructions.

### Browser Extension

See https://github.com/adobe/helix-sidekick#readme

## Configuration

Franklin Sidekick supports a number of (optional) configuration options developers can add to the project to maximize the Sidekick experience. 

See the [API documentation](docs/API.md#sidekickConfig).

## Usage
Refer to the [Sidekick documentation](https://www.hlx.live/docs/sidekick) to learn more about its features.

## Development

### Build

```bash
$ npm install
```

### Test

```bash
$ npm test
```

### Lint

```bash
$ npm run lint
```

### Testing a development version of the module or bookmarklet

Every development branch in this repository will be mirrored in https://github.com/adobe/helix-website with a `sidekick-` prefix to enable enable branch testing:

1. Push changes to a branch `issue-77`
2. Note the `sidekick-issue-77` branch in https://github.com/adobe/helix-website/branches
3. Go to `https://sidekick-issue-77--helix-website--adobe.hlx.page/tools/sidekick/` to install a development version of the bookmarklet for your project

_Note: Mirrored development branches in https://github.com/adobe/helix-website/branches must be deleted manually when no longer needed._

### Local testing

You can leverage Franklin CLI for local testing. If you haven't already installed it, run: `npm i -g @adobe/helix-cli`

#### Testing a local Sidekick version

1. Run `npm start` on your local checkout of this repository
2. Go to `http://localhost:3001/ and follow the instructions.

#### Testing a local project config

If you want to test a [config](#configuration) file before deploying it to your project:
1. Run `hlx up` on your local checkout of the project repository
2. Install a Sidekick bookmarklet for your project: https://www.hlx.live/tools/sidekick/
3. Edit the bookmarklet URL by appending `,"devMode":"true"` after `"ref":"*"` (`*` being your project branch)
4. Click the bookmarklet to launch Sidekick using your local config

## Deployment

The Sidekick module and bookmarklet gets staged automatically each time a pull request is merged into `main`.
1. Go to [`helix-website` pull requests](https://github.com/adobe/helix-website/pulls)
1. Click the _Sidekick Release Candidate_ PR
1. Add a comment listing the `helix-sidekick` PR(s) included in this release
1. Get a team member to review the Sidekick RC. The PR is based on a `sidekick-rc-*` branch (`*` being a random ID) so the RC can be tested at:
   `https://sidekick-rc-*--helix-website--adobe.hlx.page/tools/sidekick/`
1. Once approved, merge the RC PR to deploy the changes into production
