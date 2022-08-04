import { DeepPartial } from 'typeorm';

/**
 * Entity rows.
 */
export type Columns<T> = DeepPartial<T>;

/**
 * Response codes.
 */
export enum EntityResponse {
    /**
     * Success responses.
     */
    Updated='Updated',
    Destroyed='Destroyed',

    /**
     * Error responses.
     */
    NotFound='NotFound'
}