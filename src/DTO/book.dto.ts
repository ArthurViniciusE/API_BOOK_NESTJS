/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { ArrayMinSize, IsNotEmpty, IsNotEmptyObject, IsObject, IsNumber, IsPositive, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { AuthorDTO } from './author.dto';
import { Type } from 'class-transformer';


export class BookDTO {

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  readonly name: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AuthorDTO)
  @ArrayMinSize(1)
  //@IsNotEmptyObject()
  readonly author: AuthorDTO[];

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  readonly language: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly releaseYear: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  readonly publisher: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly pages: number;
}
