import React from 'react';
import { brandName } from './shared/shared';
import LoadingSpinner from './components/loader/loading-spinner';

export default function Loading() {
    return <>
        <LoadingSpinner label={brandName} extraClasses={`regentsReviewerSpinner`} color={`secondary`} />
    </>
}