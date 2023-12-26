/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Document } from "mongoose";
import * as mongoose from "mongoose";

export interface Book extends Document{

  readonly id: mongoose.Schema.Types.ObjectId;
   readonly name: string;
   readonly author: object;
   readonly language: string;
   readonly releaseYear: number;
   readonly publisher: string;
   readonly pages: number;
}

