
export class ResourceSchema<Resource> {

  readonly tableName: string

  constructor(tableName: string) {
    this.tableName = tableName
  }

  column(value: keyof Resource  & string): string {
    return value
  }
}