'use client';

import ItemForm from '@/components/ItemForm';
import { ItemList } from '@/components/ItemList';
import React from 'react';

const HomePage = () => {
  return (
    <div className="space-y-6">
      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Add New Item</h2>
        <ItemForm />
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Item List</h2>
        <ItemList />
      </section>
    </div>
  );
}

export default HomePage;