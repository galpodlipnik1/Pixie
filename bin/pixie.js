#!/usr/bin/env node
import yargs from "yargs"
import { hideBin} from "yargs/helpers"

import { getOptions } from "../index.js";

const argv = yargs(hideBin(process.argv)).argv;
const params = argv._;
const __dirname = process.cwd();

getOptions(__dirname, params);
