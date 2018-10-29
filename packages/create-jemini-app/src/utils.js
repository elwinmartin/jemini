import {spawn} from 'child_process';
import Promise from 'bluebird';
import githubDownload from 'github-download';
import exists from 'command-exists';
import chalk from 'chalk';

export const REQUIRED_VERSION_OF_NODE = 8;

export const validateNodeVersion = async () => {
  const [major] = process.versions.node.split('.');

  if (major < REQUIRED_VERSION_OF_NODE) {
    throw new Error(
      `You are running Node ${
        process.versions.node
      }.\nCreate Jemini App requires Node 8 or higher.\nPlease update your version of node.`
    );
  }
};

export const parseTemplate = async (template) => {
  switch (template) {
    case 'default':
      return 'jeminijs/default-template';
    default:
      return template;
  }
};

export const fetchTemplate = async (template, path) =>
  new Promise((resolve, reject) =>
    githubDownload(`https://github.com/${template}.git`, path)
      .on('end', resolve)
      .on('error', reject)
  );

export const installDependencies = async (spinner) => {
  const proc = {cmd: null, args: ['install'], options: {stdio: 'ignore'}};

  try {
    await exists('yarn');
    proc.cmd = 'yarn';
  } catch (err) {
    proc.cmd = 'npm';
  }

  spinner.start(`Installing dependencies with ${chalk.cyan(proc.cmd)}...`);

  return new Promise((resolve, reject) => {
    // proc.error = 'test failure';
    // return reject(proc);
    spawn(proc.cmd, proc.args, proc.options)
      .on('close', (code) => {
        if (code !== 0) {
          proc.error = `${proc.cmd} exited with ${code}`;
          return reject(proc);
        }

        return resolve(proc);
      })
      .on('error', (err) => {
        proc.error = err.message;

        reject(proc);
      });
  });
};
