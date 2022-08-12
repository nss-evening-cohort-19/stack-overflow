import React from 'react';
import { useRouter } from 'next/router';

export default function ViewAnswer() {
  const router = useRouter();
  const { firebaseKey } = router.query;
  return (
    <div>
      { firebaseKey }
    </div>
  );
}
