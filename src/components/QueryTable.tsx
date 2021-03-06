import { useState } from "react";
import { Alert, Input, Select, Typography } from "antd";
import * as CSS from "csstype";
import { getGeneData } from "../api";

import TableView from "./TableView";
import Row from "./Row";

const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

const searchBarStyle: CSS.Properties = {
  width: "40%",
};

const columnOptions = [
  "Gene_name",
  "Gene_Aliases",
  "Chromosome",
  "Gene_start",
  "Gene_end",
  "Strand",
  "Transcript_IDs",
  "Longest_Transcript",
  "longest_transcript",
  "Protein_ID",
  "MI_ID",
  "MI_start",
  "MI_end",
  "Mi_length",
  "MI_number",
  "Previous_exon_leng",
  "ensuing_exon_lengt",
  "MI_subtype",
  "MI_5'SS",
  "MI_BPS",
  "MI_3'SS",
  "MI_5'SS score",
  "MI_BPS score",
  "MI_3'SS score",
  "hgnc_id",
  "symbol",
  "locus_group",
  "locus_type",
  "status",
  "location",
  "location_sortable",
  "alias_symbol",
  "alias_name",
  "prev_symbol",
  "prev_name",
  "gene_family",
  "gene_family_id",
  "date_approved_reserved",
  "date_symbol_changed",
  "date_name_changed",
  "date_modified",
  "entrez_id",
  "ensembl_gene_id",
  "vega_id",
  "ucsc_id",
  "ena",
  "refseq_accession",
  "ccds_id",
  "uniprot_ids",
  "pubmed_id",
  "mgd_id",
  "rgd_id",
  "lsdb",
  "cosmic",
  "omim_id",
  "mirbase",
  "homeodb",
  "snornabase",
  "bioparadigms_slc",
  "orphanet",
  "pseudogene.org",
  "horde_id",
  "merops",
  "imgt",
  "iuphar",
  "kznf_gene_catalog",
  "mamit-trnadb",
  "cd",
  "lncrnadb",
  "enzyme_id",
  "intermediate_filament_db",
  "rna_central_ids",
  "lncipedia",
  "gtrnadb",
  "agr",
  "MCF10A_gene_FPKM",
  "MCF7_gene_FPKM",
  "MCF10A_psi_value",
  "MCF7_psi_value",
  "PFAM_prev",
  "PFAM_after",
  "PFAM_overlapping",
  "prev exon dna seq",
  "mi dna seq",
  "next exon dna seq",
  "prev exon protein seq",
  "prev exon+mi protein seq",
  "prev exonXmi protein seq sc",
  "gained seq",
  "gained seq count",
  "lost seq",
  "lost seq count",
  "error code",
];

function QueryTable() {
  const [result, setResult] = useState<Object[]>([]);
  const [customColumns, setCustomColumns] = useState<string[]>([]);
  const [alertText, setAlertText] = useState<string | null>(null);

  const children = columnOptions.map((option) => {
    return (
      <Option key={option} value={option}>
        {option}
      </Option>
    );
  });

  const handleSearch = async (gene: string) => {
    setAlertText(null);
    if (!gene) {
      return setAlertText("Please enter a gene name.");
    }
    const res = await getGeneData(gene, customColumns);
    if (res.length === 0) {
      return setAlertText(`${gene} not found! Please try another gene.`);
    }
    setResult(
      Object.entries(res).map(([k, v], idx) => {
        return { field: k, value: v, key: idx };
      })
    );
  };

  function handleSelectionChange(value: Array<string>) {
    setCustomColumns(value);
  }

  return (
    <>
      <Row>
        <Text>Search for a gene to view results </Text>
      </Row>
      <Row>
        <Search
          onSearch={handleSearch}
          placeholder="Enter gene name here, eg: MAPK14"
          style={searchBarStyle}
        />
      </Row>
      {alertText && (
        <Row>
          <Alert
            message={alertText}
            type="error"
            closable
            onClose={() => setAlertText(null)}
          />
        </Row>
      )}
      <Row>
        <Text>Advanced Options </Text>
      </Row>
      <Row>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "40%" }}
          placeholder="Please select columns you would like to fetch"
          onChange={handleSelectionChange}
        >
          {children}
        </Select>
      </Row>
      {result.length > 0 && <TableView data={result} />}
    </>
  );
}

export default QueryTable;
