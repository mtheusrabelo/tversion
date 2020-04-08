const util = require('util');
const exec = util.promisify(require('child_process').exec);
const path = process.cwd();
const method = process.argv[2];

(async () => {
    try {
        const { stdout: currentTag } = await exec(`cd ${path}; git describe --abbrev=0`);
        let tokens = currentTag.split('.');
        tokens[0] = tokens[0].slice(1, tokens[0].length);
        tokens[2] = tokens[2].slice(0, tokens[2].length - 3);
        tokens = tokens.map(token => Number.parseInt(token, 10));

        if (!method) {
            console.log(currentTag);
            return;
        }

        if (method === 'major') tokens[0]++;
        if (method === 'minor') tokens[1]++;
        if (method === 'patch') tokens[2]++;

        const newTag = `v${tokens.join('.')}`;
        await exec(`git tag -m ${newTag} ${newTag}`);
    } catch (err) {
        console.log(err.message);
    }
})();
