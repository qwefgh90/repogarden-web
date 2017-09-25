import { Cve, VulnerablePart, VulnerableResult, JavaModule } from '../class/cve'

export const cve1 = new Cve('2017-3159', "Apache Camel's Snakeyaml unmarshalling operation is vulnerable to Remote Code Execution attacks", "Apache Camel's camel-snakeyaml component is vulnerable to Java object de-serialization vulnerability. De-serializing untrusted data can lead to security flaws.", ["http://camel.apache.org/security-advisories.data/CVE-2017-3159.txt.asc?version=1&modificationDate=1486565167000&api=v2", "https://www.cvedetails.com/cve/CVE-2017-3159/"]);

export const cve2: Cve = new Cve('2017-3161', "Apache Hadoop NameNode XSS vulnerability", " The HDFS web UI is vulnerable to a cross-site scripting (XSS) attack through an unescaped query parameter.", ["https://bugzilla.redhat.com/show_bug.cgi?id=1448373", "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-3161", "http://seclists.org/oss-sec/2017/q2/127"]);

export const cve3: Cve = new Cve('2017-3162', "Apache Hadoop DataNode web UI vulnerability", "HDFS clients interact with a servlet on the DataNode to browse the HDFS namespace. The NameNode is provided as a query parameter that is not validated in Apache Hadoop before 2.7.0.", ["https://bugzilla.redhat.com/show_bug.cgi?id=1448373", "http://openwall.com/lists/oss-security/2017/04/26/1", "https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-3162", "http://seclists.org/oss-sec/2017/q2/126"]);
