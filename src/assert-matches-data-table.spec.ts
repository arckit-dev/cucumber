import { describe, expect, it } from 'vitest';
import { assertMatchesDataTable } from './assert-matches-data-table';

const dataTable = (rows: [string, string][]) => ({ rows: () => rows }) as unknown as Parameters<typeof assertMatchesDataTable>[0];

describe('assertMatchesDataTable', () => {
  it('should match flat properties', () => {
    const table = dataTable([
      ['name', 'Jean'],
      ['age', '30']
    ]);

    expect(() => assertMatchesDataTable(table)({ name: 'Jean', age: 30 })).not.toThrow();
  });

  it('should match nested properties with dot notation', () => {
    const table = dataTable([
      ['name.firstname', 'Jean'],
      ['name.lastname', 'Dupont']
    ]);

    expect(() => assertMatchesDataTable(table)({ name: { firstname: 'Jean', lastname: 'Dupont' } })).not.toThrow();
  });

  it('should match array elements with bracket notation', () => {
    const table = dataTable([
      ['lines[0].label', 'Prestation'],
      ['lines[1].label', 'Conseil']
    ]);

    expect(() =>
      assertMatchesDataTable(table)({ lines: [{ label: 'Prestation' }, { label: 'Conseil' }] })
    ).not.toThrow();
  });

  it('should match deeply nested properties', () => {
    const table = dataTable([['address.city', 'Paris']]);

    expect(() => assertMatchesDataTable(table)({ address: { city: 'Paris' } })).not.toThrow();
  });

  it('should throw when a value does not match', () => {
    const table = dataTable([['name', 'Jean']]);

    expect(() => assertMatchesDataTable(table)({ name: 'Pierre' })).toThrow();
  });

  it('should throw when actual is undefined', () => {
    const table = dataTable([['name', 'Jean']]);

    expect(() => assertMatchesDataTable(table)(undefined)).toThrow('Object should be defined');
  });

  it('should throw with custom message when actual is undefined', () => {
    const table = dataTable([['name', 'Jean']]);

    expect(() => assertMatchesDataTable(table)(undefined, { message: 'Client not found' })).toThrow('Client not found');
  });

  it('should handle missing nested path as "undefined" string', () => {
    const table = dataTable([['name.firstname', 'undefined']]);

    expect(() => assertMatchesDataTable(table)({ name: {} })).not.toThrow();
  });

  it('should convert numeric values to strings for comparison', () => {
    const table = dataTable([['amount', '15000']]);

    expect(() => assertMatchesDataTable(table)({ amount: 15000 })).not.toThrow();
  });
});
