import type { RowProps } from '../models/components/Row';

export default function Row({ title, id, fetchUrl, isLargeRow }: RowProps) {
  return (
    <div>
      {title}
      {id}
      {fetchUrl}
    </div>
  );
}
