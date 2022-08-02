export enum ApplicationResponse {
    /**
     * Success responses.
     */
    Updated='Updated',
    Destroyed='Destroyed',
    OwnerAdded='OwnerAdded',
    OwnerRemoved='OwnerRemoved',

    /**
     * Error responses.
     */
    NotFound='NotFound',
    NameWasTaken='NameWasTaken',
    OwnerNotExists='OwnerNotAdded',
    OwnerAlreadyExists='OwnerAlreadyAdded'
}
