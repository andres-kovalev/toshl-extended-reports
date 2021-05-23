const packageJson = require('../package.json');
const { writeFile } = require('./common');

const version = process.env.CIRCLE_TAG;
const { scripts } = packageJson;
const { build } = scripts;

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
    'devDependencies',
    'engines'
];

Object.keys(packageJson).forEach(
    (key) => allowedKeys.includes(key) || delete packageJson[key]
);
Object.assign(packageJson, {
    version,
    scripts: {
        test: 'echo "tests passed..."',
        build
    }
});

writeFile('./package.json', JSON.stringify(packageJson));

console.log('clean up: done...');
