import ZondSignTypedDataV4Content from "./ZondSignTypedDataV4Content/ZondSignTypedDataV4Content";

const ZondSignTypedDataV4 = () => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <div className="text-2xl font-bold">Signature Request</div>
        <div>Review and sign the below message data</div>
      </div>
      <div className="flex flex-col gap-4">
        <ZondSignTypedDataV4Content />
      </div>
    </div>
  );
};

export default ZondSignTypedDataV4;
