const packageJson = require('../package.json');
const { writeFile } = require('./common');

const version = process.env.CIRCLE_TAG;

const allowedKeys = [
    'name',
    'version',
    'description',
    'main',
    'module',
    'umd:main',
    'unpkg',
    'jsdelivr',
    'jsnext:main',
    'react-native',
    'source',
    'types',
    'repository',
    'keywords',
    'author',
    'license',
    'bugs',
    'homepage',
    'dependencies',
    'engines'
];

Object.keys(packageJson).forEach(
    (key) => allowedKeys.includes(key) || delete packageJson[key]
);
Object.assign(packageJson, {
    version,
    scripts: {
        test: 'echo "tests passed..."'
    }
});

writeFile('./package.json', JSON.stringify(packageJson));
