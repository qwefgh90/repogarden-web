import { Repository } from '../class/repository';
import { Commit } from '../class/commit';
import { Cve } from '../class/cve';
import { Branch } from '../class/branch';

const commit1: Commit =
    {
        sha: 'aasdvf23cv',
        message: 'first commit',
        date: '20170505',
        committerEmail: 'qwefgh90',
        committerName: 'leadersama',
        url: 'url',
        status: 'FINISHED',
        typoStatId: 1234,
    };

const commit2: Commit =
    {
        sha: '7ukm7j6km',
        message: 'second commit',
        date: '20170505',
        committerEmail: 'qwefgh90',
        committerName: 'leadersama',
        url: 'url',
        status: 'FINISHED',
        typoStatId: 2345,
    };

const commit3: Commit =
    {
        sha: 'tl24k5t24',
        message: 'third commit',
        date: '20170505',
        committerEmail: 'qwefgh90',
        committerName: 'leadersama',
        url: 'url',
        status: 'FAILED',
        typoStatId: 3456,
    }

const commit4: Commit =
    {
        sha: 'tl24k5t24',
        message: 'other commit',
        date: '20170505',
        committerEmail: 'qwefgh90',
        committerName: 'leadersama',
        url: 'url',
        status: 'SUCCESS'
    }

export const COMMITS1 = [commit1, commit2, commit3];
export const COMMITS2 = [];
export const CVE_COMMITS1 = [commit4];

export const BRANCHES1: Branch[] = [new Branch("master", undefined), new Branch("develop", undefined), new Branch("feature-2", undefined)]

export const REPOSITORIES: Repository[] = [
    new Repository(1, 'qwefgh90', 'opencv', 'http://www.naver.com', 'http://www.naver.com', "on", "master", undefined),
    new Repository(2, 'qwefgh90', 'repos', 'http://www.naver.com', 'http://www.naver.com', "off", "master", undefined),
    new Repository(3, 'qwefgh90', 'algorithm', 'http://www.naver.com', 'http://www.naver.com', "on", "master", undefined)
];

//https://github.com/victims/victims-cve-db/blob/master/database/java/2017/3161.yaml
/*
cve: 2017-3161
title: "Apache Hadoop NameNode XSS vulnerability"
description: >
    The HDFS web UI is vulnerable to a cross-site scripting (XSS) attack through an unescaped query parameter.
cvss_v2: 6.0
references:
    - https://bugzilla.redhat.com/show_bug.cgi?id=1448373
    - https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-3161
    - http://seclists.org/oss-sec/2017/q2/127
affected:
    - groupId: "org.apache.hadoop"
      artifactId: "hadoop-hdfs"
      version:
        - "<=2.6.5"
      fixedin:
        - ">=2.7.0"
*/

//https://github.com/victims/victims-cve-db/blob/master/database/java/2017/3162.yaml
/*
cve: 2017-3162
title: "Apache Hadoop DataNode web UI vulnerability"
description: >
    HDFS clients interact with a servlet on the DataNode to browse the HDFS namespace. The NameNode is provided as a query parameter that is not validated in Apache Hadoop before 2.7.0.
cvss_v2: 6.0
references:
    - https://bugzilla.redhat.com/show_bug.cgi?id=1448373
    - http://openwall.com/lists/oss-security/2017/04/26/1
    - https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-3162
    - http://seclists.org/oss-sec/2017/q2/126
affected:
    - groupId: "org.apache.hadoop"
      artifactId: "hadoop-hdfs"
      version:
        - "<=2.6.5"
      fixedin:
        - ">=2.7.0"
*/
//https://github.com/victims/victims-cve-db/blob/master/database/java/2017/3159.yaml

/*
cve: 2017-3159
title: "Apache Camel's Snakeyaml unmarshalling operation is vulnerable to Remote Code Execution attacks"
description: >
    Apache Camel's camel-snakeyaml component is vulnerable to Java object de-serialization vulnerability. De-serializing untrusted data can lead to security flaws.
cvss_v2: 7.5
references:
    - http://camel.apache.org/security-advisories.data/CVE-2017-3159.txt.asc?version=1&modificationDate=1486565167000&api=v2
    - https://www.cvedetails.com/cve/CVE-2017-3159/
affected:
    - groupId: "org.apache.camel"
      artifactId: "camel-snakeyaml"
      version:
        - "<=2.17.4"
        - "<=2.18.1,2.18"
      fixedin:
        - ">=2.17.5,2.17"
        - ">=2.18.2,2.18"
*/
