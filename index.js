#!/bin/node

const util = require('util');
const childProcess = require('child_process');
const exec = util.promisify(childProcess.exec);
const method = process.argv[2];
const tagPrefix = process.env.TVERSION_TAG_PREFIX || 'v';
const tagSufix = process.env.TVERSION_TAG_SUFFIX || '';

const getTokensByTag = rawTag => {
    const tag = rawTag.slice(tagPrefix.length, rawTag.length - tagSufix.length).trim();
    const tokens = tag.split('.');
    return tokens.map(token => Number.parseInt(token, 10));
}

const getTagByTokens = tokens => `${tagPrefix}${tokens.join('.')}${tagSufix}`;

(async () => {
    try {
        let tokens = [0, 0, 0];

        if (method !== 'init') {
            const { stdout: currentTag } = await exec('git describe --abbrev=0');
            tokens = getTokensByTag(currentTag);
        } 

        if (!method) {
            console.log(getTagByTokens(tokens));
            return;
        }

        if (method === 'major') tokens[0]++;
        if (method === 'minor') tokens[1]++;
        if (method === 'patch') tokens[2]++;

        const newTag = getTagByTokens(tokens);
        await exec(`git tag -m ${newTag} ${newTag}`);

        console.log(newTag);
    } catch (err) {
        console.log(err.message);
    }
})();
