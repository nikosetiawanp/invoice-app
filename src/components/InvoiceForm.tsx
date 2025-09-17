import { Input } from "./ui/Input";

function InvoiceForm() {
  return (
    <div className="absolute w-full h-screen bg-[#000]/50 top-[72px] md:top-[80px] lg:left-[100px] lg:top-0">
      {/* Paper */}
      <div className="bg-[#fff] flex flex-col p-6 md:p-12 md:rounded-r-[20px] w-full md:w-[615px] lg:w-[720px] h-screen">
        {/* Layout */}
        <div className="flex flex-col gap-5">
          <span className="text-[24px] font-bold text-08">New Invoice</span>
          {/* Sender */}
          <span className="text-[15px] font-bold text-01">Bill From</span>
          <Input
            id={"sender-street-address"}
            name="senderStreetAddress"
            type={"text"}
            label={"Street Address"}
            value={""}
            onChange={() => {}}
          />
          <div className="md:flex grid grid-cols-2 gap-5">
            <Input
              id={"sender-city"}
              name="senderCity"
              type={"text"}
              label={"City"}
              value={""}
              onChange={() => {}}
            />
            <Input
              id={"sender-post-code"}
              name="senderPostCode"
              type={"text"}
              label={"Post Code"}
              value={""}
              onChange={() => {}}
            />
            <div className="row-start-2 col-span-2 w-full">
              <Input
                id={"sender-country"}
                name="senderCountry"
                type={"text"}
                label={"Country"}
                value={""}
                onChange={() => {}}
              />
            </div>
          </div>
          {/* Client */}
          <span className="text-[15px] font-bold text-01">Bill To</span>
          <Input
            id={"client-name"}
            name="clientName"
            type={"text"}
            label={"Client's Name"}
            value={""}
            onChange={() => {}}
          />
          <Input
            id={"client-email"}
            name="clientEmail"
            type={"email"}
            label={"Client's Email"}
            value={""}
            onChange={() => {}}
            placeholder="e.g. email@example.com"
          />
          <Input
            id={"client-street-address"}
            name="clientStreetAddress"
            type={"text"}
            label={"Street Address"}
            value={""}
            onChange={() => {}}
          />
          <div className="md:flex grid grid-cols-2 gap-5">
            <Input
              id={"client-city"}
              name="clientCity"
              type={"text"}
              label={"City"}
              value={""}
              onChange={() => {}}
            />
            <Input
              id={"client-post-code"}
              name="clientPostCode"
              type={"text"}
              label={"Post Code"}
              value={""}
              onChange={() => {}}
            />
            <div className="row-start-2 col-span-2 w-full">
              <Input
                id={"client-country"}
                name="clientCountry"
                type={"text"}
                label={"Country"}
                value={""}
                onChange={() => {}}
              />
            </div>
          </div>

          {/* Invoice Date & Payment Terms */}
          <div className="flex gap-5"></div>

          <Input
            id={"project-description"}
            name="projectDescription"
            type={"text"}
            label={"Project Description"}
            value={""}
            onChange={() => {}}
            placeholder="e.g. Graphic Design Service"
          />

          <span className="text-[#777f98] text-[18px] font-bold">
            Item List
          </span>
        </div>
      </div>
    </div>
  );
}

export { InvoiceForm };
